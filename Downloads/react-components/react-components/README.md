# Liquid Glass React Components

This package contains 15 beautiful glassmorphic React components converted from HTML.

## Components

1. **Button** - `Button.jsx`
2. **Card** - `Card.jsx`
3. **Toggle** - `Toggle.jsx`
4. **Input** - `Input.jsx`
5. **Textarea** - `Textarea.jsx`
6. **Checkbox** - `Checkbox.jsx`
7. **Radio** - `Radio.jsx`
8. **Badge** - `Badge.jsx`
9. **Alert** - `Alert.jsx`
10. **Progress** - `Progress.jsx`
11. **Tooltip** - `Tooltip.jsx`
12. **Modal** - `Modal.jsx`
13. **Navigation** - `Navigation.jsx`
14. **Slider** - `Slider.jsx`
15. **Select** - `Select.jsx`

## Demo & Development

To view all components in a single showcase page:

```jsx
import Dev from './react-components/Dev';

// Use Dev.jsx as your main component to view all components
```

The `Dev.jsx` file provides a comprehensive demo page with:
- All 15 components organized by category
- Clear section headers and labels
- Beautiful layout with the glassmorphic background
- Easy navigation through all components

## Usage

### Import Individual Components

```jsx
import Button from './react-components/Button';
import Card from './react-components/Card';

function MyApp() {
  return (
    <div>
      <Button />
      <Card />
    </div>
  );
}
```

### Import All Components

```jsx
import { Button, Card, Toggle, Input } from './react-components';
```

## Installation

1. Copy the `react-components` folder to your project
2. Import the components you need
3. Make sure to include the Google Fonts link in your HTML:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

## Notes

- Each component comes with its own CSS file
- The original HTML structure and styling are preserved exactly
- Components are ready to use with no modifications needed
- All glassmorphic effects, animations, and shadows are identical to the originals

## Customization

To customize any component:
1. Open the corresponding `.css` file
2. Modify the CSS variables or styles
3. The changes will apply immediately

## Background Pattern

The dotted grid background pattern is included in `App.jsx`. You can:
- Use it in your main app layout
- Add it to individual component files
- Customize the pattern in the SVG definition
