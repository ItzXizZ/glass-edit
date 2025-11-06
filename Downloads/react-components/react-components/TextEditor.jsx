import React, { useState, useRef, useEffect } from 'react';
import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config.js';
import './Button.css';
import './Input.css';
import './TextEditor.css';
import './ChatPanel.css';
import './Textarea.css';

const TextEditor = () => {
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');
  const [content, setContent] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);
  const [showRefinementPanel, setShowRefinementPanel] = useState(false);
  const [userFeedback, setUserFeedback] = useState('');
  const [refinementOptions, setRefinementOptions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [brainstormMode, setBrainstormMode] = useState(false);
  const [brainstormInput, setBrainstormInput] = useState('');
  const [inputMode, setInputMode] = useState('text'); // 'text' or 'audio'
  const [isRecording, setIsRecording] = useState(false);
  const [generatedSections, setGeneratedSections] = useState([]);
  const [isBrainstormLoading, setIsBrainstormLoading] = useState(false);
  const [brainstormPhase, setBrainstormPhase] = useState('input'); // 'input' or 'structure'
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isGeneratingQuestion, setIsGeneratingQuestion] = useState(false);
  const [draggedSection, setDraggedSection] = useState(null);
  const [selectedSectionIds, setSelectedSectionIds] = useState([]);
  const dragStateRef = useRef({
    isDragging: false,
    draggedElement: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0
  });
  const sectionsRef = useRef(generatedSections);
  const editorRef = useRef(null);
  const refinementPanelRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // Initialize OpenAI client
  const openaiClient = useRef(null);
  
  useEffect(() => {
    if (OPENAI_API_KEY && OPENAI_API_KEY !== 'your_openai_api_key_here') {
      openaiClient.current = new OpenAI({
        apiKey: OPENAI_API_KEY,
        dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
      });
    }
  }, []);

  const updateStats = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      setCharCount(text.length);
      const words = text.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  };

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
    updateStats();
  };

  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const saveDocument = () => {
    const doc = {
      title: documentTitle,
      content: editorRef.current?.innerHTML || '',
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('doc_' + Date.now(), JSON.stringify(doc));
    alert('Document saved successfully!');
  };

  const loadDocument = () => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('doc_'));
    if (keys.length === 0) {
      alert('No saved documents found');
      return;
    }
    
    const lastKey = keys[keys.length - 1];
    const doc = JSON.parse(localStorage.getItem(lastKey));
    setDocumentTitle(doc.title);
    if (editorRef.current) {
      editorRef.current.innerHTML = doc.content;
      setContent(doc.content);
      updateStats();
    }
    alert('Document loaded successfully!');
  };

  const exportDocument = () => {
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${documentTitle}</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <h1>${documentTitle}</h1>
  ${content}
</body>
</html>
    `;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = documentTitle.replace(/\s+/g, '_') + '.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearDocument = () => {
    if (confirm('Are you sure you want to clear the document?')) {
      setDocumentTitle('Untitled Document');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
        setContent('');
        updateStats();
      }
      // Clear auto-saved content from localStorage
      localStorage.removeItem('editor_autosave_content');
      localStorage.removeItem('editor_autosave_title');
    }
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  // Handle text selection for refinement
  const handleSelection = () => {
    // Don't clear selection if refinement panel is open
    if (showRefinementPanel) {
      return;
    }
    
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text && editorRef.current && editorRef.current.contains(selection.anchorNode)) {
      setSelectedText(text);
      
      // Save the selection range
      if (selection.rangeCount > 0) {
        setSelectionRange(selection.getRangeAt(0).cloneRange());
      }
    } else {
      setSelectedText('');
      setSelectionRange(null);
    }
  };

  const openRefinementPanel = () => {
    if (!selectedText) {
      alert('Please select some text first.');
      return;
    }
    setShowRefinementPanel(true);
  };

  const closeRefinementPanel = () => {
    setShowRefinementPanel(false);
    setUserFeedback('');
    setRefinementOptions([]);
    setSelectedOptionIndex(null);
    setAdditionalFeedback('');
    setSelectedText('');
    setSelectionRange(null);
  };

  const generateRefinements = async () => {
    if (!userFeedback.trim()) {
      alert('Please provide feedback on why this sentence needs refinement.');
      return;
    }

    setIsGenerating(true);

    try {
      if (!openaiClient.current) {
        throw new Error('OpenAI API key not configured. Please add your API key to the config.js file.');
      }

      const response = await openaiClient.current.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a helpful writing assistant. When given a sentence and feedback about it, provide 3 different refined versions of that sentence. Return ONLY the 3 refined sentences, one per line, without numbering or additional explanation."
          },
          {
            role: "user",
            content: `Original sentence: "${selectedText}"\n\nUser feedback: ${userFeedback}\n\nPlease provide 3 refined versions of this sentence that address the feedback.`
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const refinedText = response.choices[0].message.content.trim();
      const options = refinedText.split('\n').filter(line => line.trim().length > 0);
      
      setRefinementOptions(options.length >= 3 ? options.slice(0, 3) : options);
      setIsGenerating(false);
    } catch (error) {
      console.error('Error generating refinements:', error);
      alert(`Error: ${error.message}\n\nPlease check your OpenAI API key in the config.js file.`);
      setIsGenerating(false);
    }
  };

  const applyRefinement = (refinedText) => {
    if (selectionRange && editorRef.current) {
      // Restore the selection
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectionRange);
      
      // Replace the selected text
      document.execCommand('insertText', false, refinedText);
      
      // Update content and close panel
      setContent(editorRef.current.innerHTML);
      updateStats();
      closeRefinementPanel();
    }
  };

  const provideFurtherFeedback = async () => {
    // If user has selected an option and provided additional feedback, refine that selection
    if (selectedOptionIndex !== null && additionalFeedback.trim()) {
      const selectedSentence = refinementOptions[selectedOptionIndex];
      setSelectedText(selectedSentence);
      setUserFeedback(additionalFeedback);
      setAdditionalFeedback('');
      setRefinementOptions([]);
      setSelectedOptionIndex(null);
      setIsGenerating(true);

      try {
        if (!openaiClient.current) {
          throw new Error('OpenAI API key not configured. Please add your API key to the config.js file.');
        }

        const response = await openaiClient.current.chat.completions.create({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are a helpful writing assistant. When given a sentence and feedback about it, provide 3 different refined versions of that sentence. Return ONLY the 3 refined sentences, one per line, without numbering or additional explanation."
            },
            {
              role: "user",
              content: `Original sentence: "${selectedSentence}"\n\nUser feedback: ${additionalFeedback}\n\nPlease provide 3 refined versions of this sentence that address the feedback.`
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
        });

        const refinedText = response.choices[0].message.content.trim();
        const options = refinedText.split('\n').filter(line => line.trim().length > 0);
        
        setRefinementOptions(options.length >= 3 ? options.slice(0, 3) : options);
        setIsGenerating(false);
      } catch (error) {
        console.error('Error generating refinements:', error);
        alert(`Error: ${error.message}\n\nPlease check your OpenAI API key in the config.js file.`);
        setIsGenerating(false);
      }
    } else {
      // Just reset to start over with original text
      setRefinementOptions([]);
      setUserFeedback('');
      setSelectedOptionIndex(null);
      setAdditionalFeedback('');
    }
  };

  const selectOption = (index) => {
    setSelectedOptionIndex(index);
    setAdditionalFeedback('');
  };

  const proceedWithRefinement = () => {
    if (selectedOptionIndex !== null && selectionRange && editorRef.current) {
      let finalText = refinementOptions[selectedOptionIndex];
      
      // If there's additional feedback, we could optionally process it
      // For now, we'll just apply the selected option as-is
      
      // Restore the selection
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectionRange);
      
      // Replace the selected text
      document.execCommand('insertText', false, finalText);
      
      // Update content and close panel
      setContent(editorRef.current.innerHTML);
      updateStats();
      closeRefinementPanel();
    }
  };

  // Brainstorm mode functions
  const toggleBrainstormMode = () => {
    const newMode = !brainstormMode;
    setBrainstormMode(newMode);
    setBrainstormInput('');
    setGeneratedSections([]);
    setIsBrainstormLoading(false);
    setBrainstormPhase('input');
    
    // Generate initial question when entering brainstorm mode
    if (newMode) {
      generateQuestion();
    }
  };

  const generateQuestion = async () => {
    // Count words in brainstorm input
    const words = brainstormInput.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;
    
    // Show placeholder message if less than or equal to 10 words
    if (wordCount <= 10) {
      setCurrentQuestion('Begin Brainstorming to Receive Question');
      setIsGeneratingQuestion(false);
      return;
    }
    
    setIsGeneratingQuestion(true);
    
    try {
      if (!openaiClient.current) {
        setCurrentQuestion('What are you still not addressing?');
        setIsGeneratingQuestion(false);
        return;
      }

      const response = await openaiClient.current.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a perceptive writing coach. Analyze the writer's brainstorming and identify the most important unaddressed question or gap in their thinking. Generate a single, direct question that points to what they're avoiding, missing, or haven't fully explored yet. Keep it under 15 words. Return ONLY the question, nothing else."
          },
          {
            role: "user",
            content: `Read this brainstorming and identify the most pervasive unaddressed question:\n\n${brainstormInput}\n\nWhat critical question is still lingering despite all this brainstorming?`
          }
        ],
        temperature: 0.8,
        max_tokens: 50,
      });

      setCurrentQuestion(response.choices[0].message.content.trim().replace(/['"]/g, ''));
      setIsGeneratingQuestion(false);
    } catch (error) {
      console.error('Error generating question:', error);
      setCurrentQuestion('What are you still not addressing?');
      setIsGeneratingQuestion(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Unable to access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob) => {
    try {
      if (!openaiClient.current) {
        throw new Error('OpenAI API key not configured.');
      }

      // Convert blob to file
      const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });

      const response = await openaiClient.current.audio.transcriptions.create({
        file: audioFile,
        model: 'whisper-1',
      });

      setBrainstormInput(response.text);
    } catch (error) {
      console.error('Error transcribing audio:', error);
      alert('Error transcribing audio. Please try again.');
    }
  };

  const proceedToStructure = async () => {
    if (!brainstormInput.trim()) {
      alert('Please write something first.');
      return;
    }

    setIsBrainstormLoading(true);

    try {
      if (!openaiClient.current) {
        throw new Error('OpenAI API key not configured.');
      }

      const response = await openaiClient.current.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a creative writing assistant. Analyze the stream of consciousness writing and break it into logical story sections. Return a JSON array of objects with 'title' (section name, 2-4 words), 'description' (1-2 sentences describing this part), and 'size' ('small', 'medium', or 'large' based on importance and content depth). Return ONLY valid JSON, no additional text."
          },
          {
            role: "user",
            content: `Analyze this stream of consciousness and create a story structure:\n\n${brainstormInput}`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      });

      const sectionsText = response.choices[0].message.content.trim();
      let sections;
      try {
        sections = JSON.parse(sectionsText);
      } catch (e) {
        const jsonMatch = sectionsText.match(/```(?:json)?\s*(\[[\s\S]*?\])\s*```/);
        if (jsonMatch) {
          sections = JSON.parse(jsonMatch[1]);
        } else {
          throw new Error('Could not parse response as JSON');
        }
      }

      // Add unique IDs and grid positions with slight randomness (3 per row)
      const BOXES_PER_ROW = 3;
      const BOX_WIDTH = 320; // pixels
      const BOX_HEIGHT = 200; // pixels approx spacing
      const HORIZONTAL_GAP = 30;
      const VERTICAL_GAP = 30;
      const START_X = 20;
      const START_Y = 20;
      const RANDOMNESS = 25; // pixels of random offset
      
      sections = sections.map((section, index) => {
        const row = Math.floor(index / BOXES_PER_ROW);
        const col = index % BOXES_PER_ROW;
        
        // Add slight random offsets
        const randomX = (Math.random() - 0.5) * RANDOMNESS * 2;
        const randomY = (Math.random() - 0.5) * RANDOMNESS * 2;
        
        return {
          ...section,
          id: `section-${Date.now()}-${index}`,
          size: section.size || 'medium',
          x: START_X + col * (BOX_WIDTH + HORIZONTAL_GAP) + randomX,
          y: START_Y + row * (BOX_HEIGHT + VERTICAL_GAP) + randomY
        };
      });

      setGeneratedSections(sections);
      setIsBrainstormLoading(false);
      
      // Transition to structure phase
      setTimeout(() => {
        setBrainstormPhase('structure');
      }, 500);
    } catch (error) {
      console.error('Error generating sections:', error);
      alert(`Error: ${error.message}`);
      setIsBrainstormLoading(false);
    }
  };

  const handleMouseDown = (e, section) => {
    // Don't drag if clicking on inputs or textareas
    const target = e.target;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'LABEL') {
      return;
    }
    
    const block = e.currentTarget;
    if (!block) return;
    
    const container = document.querySelector('.draggable-blocks-container');
    if (!container) return;
    
    const containerRect = container.getBoundingClientRect();
    
    // Calculate offset from mouse to section's origin (not the block's visual position)
    // This prevents any jumping when dragging starts
    const mouseXInContainer = e.clientX - containerRect.left + container.scrollLeft;
    const mouseYInContainer = e.clientY - containerRect.top + container.scrollTop;
    
    const offsetX = mouseXInContainer - section.x;
    const offsetY = mouseYInContainer - section.y;
    
    // Store drag state in ref (no re-renders)
    dragStateRef.current = {
      isDragging: false, // Start as false, will set to true on mouse move
      draggedElement: block,
      sectionId: section.id,
      offsetX: offsetX,
      offsetY: offsetY,
      startX: section.x,
      startY: section.y,
      containerRect: containerRect,
      container: container,
      initialMouseX: e.clientX,
      initialMouseY: e.clientY,
      hasMoved: false
    };
    
    setDraggedSection(section);
    
    // Prevent text selection
    e.preventDefault();
    document.body.style.userSelect = 'none';
  };

  const handleMouseMove = (e) => {
    const dragState = dragStateRef.current;
    if (!dragState.draggedElement || !dragState.container) return;
    
    // Check if we've moved enough to start dragging (threshold to prevent accidental drags)
    if (!dragState.isDragging && !dragState.hasMoved) {
      const deltaX = Math.abs(e.clientX - dragState.initialMouseX);
      const deltaY = Math.abs(e.clientY - dragState.initialMouseY);
      
      if (deltaX > 3 || deltaY > 3) {
        dragState.isDragging = true;
        dragState.hasMoved = true;
        dragState.draggedElement.classList.add('dragging');
        document.body.style.cursor = 'grabbing';
      } else {
        return; // Don't drag yet
      }
    }
    
    if (!dragState.isDragging) return;
    
    // Calculate new position directly, accounting for current scroll position
    const mouseXInContainer = e.clientX - dragState.containerRect.left + dragState.container.scrollLeft;
    const mouseYInContainer = e.clientY - dragState.containerRect.top + dragState.container.scrollTop;
    
    const newX = mouseXInContainer - dragState.offsetX;
    const newY = mouseYInContainer - dragState.offsetY;
    
    // Apply position immediately via transform (no state update = instant)
    dragState.draggedElement.style.transform = `translate(${newX - dragState.startX}px, ${newY - dragState.startY}px)`;
  };

  const handleMouseUp = (e) => {
    const dragState = dragStateRef.current;
    if (!dragState.draggedElement) return;
    
    // Only update position if we actually dragged
    if (dragState.isDragging && dragState.hasMoved && dragState.container) {
      // Calculate final position, accounting for current scroll position
      const mouseXInContainer = e.clientX - dragState.containerRect.left + dragState.container.scrollLeft;
      const mouseYInContainer = e.clientY - dragState.containerRect.top + dragState.container.scrollTop;
      
      const newX = mouseXInContainer - dragState.offsetX;
      const newY = mouseYInContainer - dragState.offsetY;
      
      // Constrain to bounds
      const constrainedX = Math.max(0, newX);
      const constrainedY = Math.max(0, newY);
      
      // Update state with final position using the ref to avoid stale closure
      const newSections = sectionsRef.current.map(section =>
        section.id === dragState.sectionId
          ? { ...section, x: constrainedX, y: constrainedY }
          : section
      );
      
      setGeneratedSections(newSections);
      
      // Reset transform
      dragState.draggedElement.style.transform = '';
    }
    
    // Remove dragging class
    if (dragState.draggedElement) {
      dragState.draggedElement.classList.remove('dragging');
    }
    
    // Clean up
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    
    setDraggedSection(null);
    dragStateRef.current.isDragging = false;
    dragStateRef.current.hasMoved = false;
    dragStateRef.current.draggedElement = null;
  };

  // Keep sectionsRef in sync with generatedSections
  useEffect(() => {
    sectionsRef.current = generatedSections;
  }, [generatedSections]);

  // Add global mouse listeners
  useEffect(() => {
    const moveHandler = (e) => handleMouseMove(e);
    const upHandler = (e) => handleMouseUp(e);
    
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
    
    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);
    };
  }, []);

  const updateSection = (index, field, value) => {
    const newSections = [...generatedSections];
    newSections[index][field] = value;
    setGeneratedSections(newSections);
  };

  const autoResizeTextarea = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  const copySection = (section) => {
    const text = `${section.title}\n\n${section.description}`;
    navigator.clipboard.writeText(text);
    alert('Section copied to clipboard!');
  };

  const copyAllSections = () => {
    const text = generatedSections
      .map(section => `${section.title}\n\n${section.description}`)
      .join('\n\n---\n\n');
    navigator.clipboard.writeText(text);
    alert('All sections copied to clipboard!');
  };

  const copySelectedSections = () => {
    if (selectedSectionIds.length === 0) {
      alert('Please select at least one section first.');
      return;
    }
    
    const selectedSections = generatedSections.filter(s => 
      selectedSectionIds.includes(s.id)
    );
    
    const text = selectedSections
      .map(section => `${section.title}\n\n${section.description}`)
      .join('\n\n---\n\n');
    
    navigator.clipboard.writeText(text);
    alert(`${selectedSections.length} section(s) copied to clipboard!`);
  };

  const toggleSectionSelection = (sectionId) => {
    setSelectedSectionIds(prev => {
      if (prev.includes(sectionId)) {
        return prev.filter(id => id !== sectionId);
      } else {
        return [...prev, sectionId];
      }
    });
  };

  // Auto-save content and title to localStorage
  useEffect(() => {
    if (content || documentTitle !== 'Untitled Document') {
      localStorage.setItem('editor_autosave_content', content);
      localStorage.setItem('editor_autosave_title', documentTitle);
    }
  }, [content, documentTitle]);

  // Load content and title from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('editor_autosave_content');
    const savedTitle = localStorage.getItem('editor_autosave_title');
    
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
      setContent(savedContent);
      updateStats();
    }
    
    if (savedTitle) {
      setDocumentTitle(savedTitle);
    }
  }, []);

  // Restore editor content when switching back from brainstorm mode
  useEffect(() => {
    if (!brainstormMode && editorRef.current && content) {
      // Only restore if the editor is empty (just switched back)
      if (!editorRef.current.innerHTML || editorRef.current.innerHTML.trim() === '') {
        editorRef.current.innerHTML = content;
        updateStats();
      }
    }
  }, [brainstormMode]);

  // Regenerate question when brainstorm input changes
  useEffect(() => {
    if (brainstormMode && brainstormPhase === 'input') {
      const words = brainstormInput.trim().split(/\s+/).filter(word => word.length > 0);
      const wordCount = words.length;
      
      // Update question when crossing the 10-word threshold or when content changes significantly
      if (wordCount === 11 || (wordCount > 10 && wordCount % 20 === 0)) {
        generateQuestion();
      } else if (wordCount <= 10) {
        setCurrentQuestion('Begin Brainstorming to Receive Question');
      }
    }
  }, [brainstormInput, brainstormMode, brainstormPhase]);

  // Auto-resize textareas when sections are loaded or updated
  useEffect(() => {
    if (brainstormPhase === 'structure') {
      const textareas = document.querySelectorAll('.block-description-input');
      textareas.forEach(textarea => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
      });
    }
  }, [generatedSections, brainstormPhase]);

  // Listen for text selection
  useEffect(() => {
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('keyup', handleSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('keyup', handleSelection);
    };
  }, [showRefinementPanel]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refinementPanelRef.current && !refinementPanelRef.current.contains(event.target)) {
        if (showRefinementPanel) {
          closeRefinementPanel();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showRefinementPanel]);

  return (
    <div className="text-editor-app">
      {/* Background pattern SVG */}
      <svg className="editor-background" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="editorGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#editorGrid)" />
      </svg>

      <div className="editor-container">
        {/* Header with Title and Actions */}
        <div className="editor-header">
          <div className="title-section">
            <h1 className="app-title">Glass Editor</h1>
            <div className="form-group title-group">
              <div className="input-wrap">
                <input
                  type="text"
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Document Title"
                  className="title-input"
                />
                <div className="input-shadow"></div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <div className="button-wrap brainstorm-btn" onClick={toggleBrainstormMode}>
              <button>
                <span>{brainstormMode ? 'Editor' : 'Brainstorm'}</span>
              </button>
              <div className="button-shadow"></div>
            </div>
            <div className="button-wrap" onClick={saveDocument}>
              <button><span>Save</span></button>
              <div className="button-shadow"></div>
            </div>
            <div className="button-wrap" onClick={loadDocument}>
              <button><span>Load</span></button>
              <div className="button-shadow"></div>
            </div>
            <div className="button-wrap" onClick={exportDocument}>
              <button><span>Export</span></button>
              <div className="button-shadow"></div>
            </div>
            <div className="button-wrap" onClick={clearDocument}>
              <button><span>Clear</span></button>
              <div className="button-shadow"></div>
            </div>
          </div>
        </div>

        {/* Brainstorm Mode */}
        {brainstormMode ? (
          <div className="brainstorm-container-new">
            {brainstormPhase === 'input' ? (
              /* Input Phase - Stream of Consciousness */
              <div className="stream-of-consciousness-panel">
                <div className="soc-card">
                  <div className="soc-content">
                    {/* Question at top */}
                    <div className="soc-question-bar">
                      <div className={`question-text ${currentQuestion === 'Begin Brainstorming to Receive Question' ? 'question-placeholder' : ''}`}>
                        {isGeneratingQuestion ? (
                          <span className="question-loading">Generating question...</span>
                        ) : (
                          currentQuestion
                        )}
                      </div>
                      {currentQuestion !== 'Begin Brainstorming to Receive Question' && (
                        <div 
                          className="refresh-question-btn" 
                          onClick={generateQuestion}
                          title="Get a new question"
                        >
                          <span>↻</span>
                        </div>
                      )}
                    </div>

                    {/* Large text area */}
                    <div className="soc-textarea-container">
                      <textarea
                        value={brainstormInput}
                        onChange={(e) => setBrainstormInput(e.target.value)}
                        placeholder="Start writing your stream of consciousness... Let your thoughts flow freely."
                        className="soc-textarea"
                      />
                      <div className="soc-textarea-shadow"></div>
                    </div>

                    {/* Controls at bottom */}
                    <div className="soc-controls">
                      <div className="soc-bottom-left">
                        {!isBrainstormLoading && (
                          <div className="button-wrap ready-btn" onClick={proceedToStructure}>
                            <button><span>Ready</span></button>
                            <div className="button-shadow"></div>
                          </div>
                        )}
                      </div>

                      <div className="soc-bottom-right">
                        <div 
                          className={`mic-circle-btn ${isRecording ? 'recording' : ''}`}
                          onClick={isRecording ? stopRecording : startRecording}
                          title={isRecording ? "Stop recording" : "Start recording"}
                        >
                          <div className="mic-circle-content">
                            <span className="record-dot"></span>
                          </div>
                          <div className="mic-circle-shadow"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="soc-card-shadow"></div>
                </div>
              </div>
            ) : brainstormPhase === 'structure' ? (
              /* Structure Phase - Draggable Blocks */
              <div className="structure-panel">
                <div className="structure-header">
                  <h3 className="structure-title">Story Structure</h3>
                </div>

                <div className="draggable-blocks-container">
                  {generatedSections.map((section, index) => (
                    <div
                      key={section.id}
                      className={`draggable-block ${section.size} ${draggedSection?.id === section.id ? 'dragging' : ''}`}
                      style={{
                        position: 'absolute',
                        left: `${section.x}px`,
                        top: `${section.y}px`,
                        width: '330px'
                      }}
                      onMouseDown={(e) => handleMouseDown(e, section)}
                    >
                      {/* Number on top left */}
                      <div className="block-number">
                        {index + 1}
                      </div>
                      
                      {/* Checkbox for selection on top right */}
                      <div className="block-checkbox">
                        <input
                          type="checkbox"
                          id={`checkbox-${section.id}`}
                          checked={selectedSectionIds.includes(section.id)}
                          onChange={() => toggleSectionSelection(section.id)}
                        />
                        <label htmlFor={`checkbox-${section.id}`}></label>
                      </div>

                      <div className="block-content">
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => updateSection(index, 'title', e.target.value)}
                          className="block-title-input"
                          placeholder="Section title"
                        />
                        <textarea
                          value={section.description}
                          onChange={(e) => {
                            updateSection(index, 'description', e.target.value);
                            autoResizeTextarea(e);
                          }}
                          onInput={autoResizeTextarea}
                          className="block-description-input"
                          placeholder="Section description"
                          rows="3"
                        />
                      </div>
                      <div className="block-shadow"></div>
                    </div>
                  ))}
                </div>

                {/* Navigation Buttons - Bottom Right */}
                <div className="structure-nav-buttons">
                  <div className="nav-button-wrap back-btn" onClick={() => setBrainstormPhase('input')}>
                    <button title="Go back">
                      <span>←</span>
                    </button>
                    <div className="button-shadow"></div>
                  </div>
                  <div className="nav-button-wrap next-btn" onClick={copySelectedSections}>
                    <button title="Copy selected sections and continue">
                      <span>→</span>
                    </button>
                    <div className="button-shadow"></div>
                  </div>
                </div>
              </div>
            ) : null}

            {/* Loading Overlay */}
            {isBrainstormLoading && (
              <div className="brainstorm-loading-overlay">
                <div className="loading-content">
                  <div className="loading-spinner-large">
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                    <div className="spinner-ring"></div>
                  </div>
                  <p className="loading-text">Analyzing your stream of consciousness...</p>
                  <p className="loading-subtext">Creating story structure</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Toolbar */}
            <div className="toolbar-card">
              <div className="toolbar-content">
            {/* Text Formatting Row */}
            <div className="toolbar-row">
              <div className="toolbar-group">
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('bold')}>
                  <button title="Bold"><span className="format-icon bold">B</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('italic')}>
                  <button title="Italic"><span className="format-icon italic">I</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('underline')}>
                  <button title="Underline"><span className="format-icon underline">U</span></button>
                  <div className="button-shadow"></div>
                </div>
              </div>

              <div className="toolbar-divider"></div>

              <div className="toolbar-group">
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('justifyLeft')}>
                  <button title="Align Left"><span className="format-icon">⇤</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('justifyCenter')}>
                  <button title="Center"><span className="format-icon">⇥</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('justifyRight')}>
                  <button title="Align Right"><span className="format-icon">⇥</span></button>
                  <div className="button-shadow"></div>
                </div>
              </div>

              <div className="toolbar-divider"></div>

              <div className="toolbar-group">
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('insertUnorderedList')}>
                  <button title="Bullet List"><span className="format-icon">•</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('insertOrderedList')}>
                  <button title="Numbered List"><span className="format-icon">1.</span></button>
                  <div className="button-shadow"></div>
                </div>
              </div>

              <div className="toolbar-divider"></div>

              <div className="toolbar-group">
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('formatBlock', '<h1>')}>
                  <button title="Heading 1"><span className="format-icon">H1</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('formatBlock', '<h2>')}>
                  <button title="Heading 2"><span className="format-icon">H2</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('formatBlock', '<p>')}>
                  <button title="Paragraph"><span className="format-icon">P</span></button>
                  <div className="button-shadow"></div>
                </div>
              </div>

              <div className="toolbar-divider"></div>

              <div className="toolbar-group">
                <div className="button-wrap toolbar-btn" onClick={insertLink}>
                  <button title="Insert Link"><span className="format-icon">Link</span></button>
                  <div className="button-shadow"></div>
                </div>
                <div className="button-wrap toolbar-btn" onClick={() => executeCommand('removeFormat')}>
                  <button title="Clear Formatting"><span className="format-icon">Clear</span></button>
                  <div className="button-shadow"></div>
                </div>
              </div>

              <div className="toolbar-divider"></div>

              <div className="toolbar-group">
                <div 
                  className={`button-wrap toolbar-btn ${!selectedText ? 'disabled' : ''}`} 
                  onClick={openRefinementPanel}
                  style={{ opacity: selectedText ? 1 : 0.5 }}
                >
                  <button 
                    title={selectedText ? "Refine Selected Text" : "Select text to refine"} 
                    disabled={!selectedText}
                  >
                    <span className="format-icon">Refine</span>
                  </button>
                  <div className="button-shadow"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="toolbar-shadow"></div>
        </div>

        {/* Main Editor Area */}
        <div className="editor-main">
          <div
            ref={editorRef}
            className="editor-content"
            contentEditable
            onInput={handleInput}
            suppressContentEditableWarning
          ></div>
          <div className="editor-shadow"></div>
        </div>

        {/* Status Bar */}
        <div className="status-bar">
          <div className="status-content">
            <span className="status-item">Words: {wordCount}</span>
            <span className="status-separator">•</span>
            <span className="status-item">Characters: {charCount}</span>
          </div>
          <div className="status-shadow"></div>
        </div>
          </>
        )}
      </div>

      {/* Sentence Refinement Panel */}
      {showRefinementPanel && (
        <div className="refinement-panel-overlay">
          <div className="refinement-panel-wrap" ref={refinementPanelRef}>
            <div className="refinement-panel">
              <div className="refinement-panel-content">
                {/* Header */}
                <div className="refinement-header">
                  <h3 className="refinement-title">Sentence Refinement</h3>
                  <div className="button-wrap close-btn" onClick={closeRefinementPanel}>
                    <button className="icon-btn">
                      <span>×</span>
                    </button>
                    <div className="button-shadow"></div>
                  </div>
                </div>

                {/* Selected Text Display */}
                <div className="selected-text-display">
                  <div className="selected-text-label">Selected Text:</div>
                  <div className="selected-text-content">"{selectedText}"</div>
                </div>

                {/* Feedback Input */}
                {refinementOptions.length === 0 && (
                  <div className="feedback-section">
                    <label className="feedback-label">
                      Why does this sentence need refinement?
                    </label>
                    <div className="form-group">
                      <div className="textarea-wrap">
                        <textarea
                          value={userFeedback}
                          onChange={(e) => setUserFeedback(e.target.value)}
                          placeholder="E.g., 'Too wordy', 'Lacks clarity', 'Needs better flow'..."
                          className="feedback-textarea"
                          rows="4"
                        />
                        <div className="textarea-shadow"></div>
                      </div>
                    </div>
                    <div className={`button-wrap ${isGenerating ? 'loading' : ''}`}>
                      <button disabled={isGenerating} onClick={generateRefinements}>
                        <span>{isGenerating ? 'Generating...' : 'Generate Options'}</span>
                      </button>
                      <div className="button-shadow"></div>
                    </div>
                  </div>
                )}

                {/* Refinement Options */}
                {refinementOptions.length > 0 && (
                  <div className="options-section">
                    <div className="options-label">Select a refined version:</div>
                    <div className="options-list">
                      {refinementOptions.map((option, index) => (
                        <div key={index} className={`button-wrap ${selectedOptionIndex === index ? 'selected-option' : ''}`}>
                          <button onClick={() => selectOption(index)}>
                            <span className="option-content">
                              {option}
                            </span>
                          </button>
                          <div className="button-shadow"></div>
                        </div>
                      ))}
                    </div>

                    {/* Additional Feedback Input - Shows when option is selected */}
                    {selectedOptionIndex !== null && (
                      <div className="additional-feedback-section">
                        <label className="feedback-label">
                          Want to refine this option further? Provide additional feedback:
                        </label>
                        <div className="form-group">
                          <div className="input-wrap">
                            <input
                              type="text"
                              value={additionalFeedback}
                              onChange={(e) => setAdditionalFeedback(e.target.value)}
                              placeholder="E.g., 'Make it more concise', 'Add emphasis', 'Use simpler words'..."
                              className="additional-feedback-input"
                            />
                            <div className="input-shadow"></div>
                          </div>
                        </div>
                        <div className="refinement-actions">
                          <div className="button-wrap">
                            <button onClick={proceedWithRefinement}>
                              <span>Apply Selection</span>
                            </button>
                            <div className="button-shadow"></div>
                          </div>
                          <div className={`button-wrap ${isGenerating ? 'loading' : ''}`}>
                            <button 
                              onClick={provideFurtherFeedback}
                              disabled={!additionalFeedback.trim() || isGenerating}
                            >
                              <span>{isGenerating ? 'Refining...' : 'Refine Further'}</span>
                            </button>
                            <div className="button-shadow"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Try Different Feedback - Shows when no option is selected */}
                    {selectedOptionIndex === null && (
                      <div className="options-actions">
                        <div className="button-wrap">
                          <button onClick={provideFurtherFeedback}>
                            <span>Start Over</span>
                          </button>
                          <div className="button-shadow"></div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="refinement-panel-shadow"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
