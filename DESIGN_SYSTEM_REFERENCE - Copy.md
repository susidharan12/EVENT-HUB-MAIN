# EventHub Design System - Developer Reference Guide

## Quick Reference

### Color Palette

```css
/* Primary Gradient - Used for main CTAs */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Accent Gradient - Used for highlights */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* Success Gradient - Used for positive actions */
background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);

/* Error Gradient - Used for destructive actions */
background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);

/* Info Gradient - Used for informational buttons */
background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);

/* Light Background */
background: rgba(255, 255, 255, 0.95);

/* Dark Background */
background: #0f172a;

/* Text Colors */
Light Text: #f9fafb;
Dark Text: #1f2937;
```

---

### Button Templates

#### Primary Button (Copy & Paste)
```css
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
  padding: 14px 28px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: left 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
}

.btn-primary:hover::before {
  left: 100%;
}
```

#### Action Button - Edit (Copy & Paste)
```css
.action-edit {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.action-edit:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.5);
}
```

#### Action Button - Delete (Copy & Paste)
```css
.action-delete {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(239, 68, 68, 0.3);
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.action-delete:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.5);
}
```

---

### Animation Templates

#### Card Fade-In (Staggered) - Copy & Paste
```css
@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.event-card {
  animation: cardFadeIn 0.5s ease-out forwards;
  opacity: 0;
}

.event-card:nth-child(1) { animation-delay: 0.1s; }
.event-card:nth-child(2) { animation-delay: 0.2s; }
.event-card:nth-child(3) { animation-delay: 0.3s; }
.event-card:nth-child(4) { animation-delay: 0.4s; }
.event-card:nth-child(5) { animation-delay: 0.5s; }
.event-card:nth-child(6) { animation-delay: 0.6s; }
```

#### Modal Slide-Up - Copy & Paste
```css
@keyframes modalSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content {
  animation: modalSlideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Smooth Focus Effect - Copy & Paste
```css
input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  transition: all 0.3s ease;
}
```

---

### Global Easing Function
**Use this for all transitions and animations:**
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

### Table Header Gradient - Copy & Paste
```css
.table-header,
thead {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  font-weight: 700;
}
```

---

### Form Input Styling - Copy & Paste
```css
input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
select,
textarea {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 2px solid rgba(102, 126, 234, 0.2);
  background: rgba(255, 255, 255, 0.95);
  color: #1f2937;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  font-family: inherit;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: #667eea;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

input::placeholder,
textarea::placeholder {
  color: #9ca3af;
}
```

---

### Glassmorphism Effect - Copy & Paste
```css
.card,
.modal,
.panel {
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

---

### Hover Elevation Effect - Copy & Paste
```css
.card:hover,
.button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
}
```

---

## Common Tasks

### Add a New Button Style
1. Copy the Primary Button template above
2. Change the gradient colors as needed
3. Adjust shadow color to match gradient
4. Update hover transform if needed
5. Test in browser

### Add a New Animation
1. Copy an animation template above
2. Modify keyframes as needed
3. Apply to element with `animation` property
4. Add `animation-delay` if using stagger effect
5. Test for smooth 60fps performance

### Update a Color
**Search and replace in CSS files**:
- Old Color: `#667eea`
- New Color: (your new color)
- Applies to: All primary elements

### Create a Consistent Card Style
Use the glassmorphism template above with standard padding and border-radius.

---

## Quick Tips

### 1. Maintain Consistency
- Always use `cubic-bezier(0.4, 0, 0.2, 1)` for easing
- Always use primary gradient for main buttons
- Always use 12px border-radius for modern look
- Always use 0.3s for standard transitions

### 2. Performance
- Use `transform` and `opacity` for animations (GPU accelerated)
- Avoid animating `width`, `height`, `left`, `right`, etc.
- Use `will-change` sparingly for heavy animations
- Test animations on mobile devices

### 3. Accessibility
- Always include `:focus` states for inputs
- Maintain sufficient color contrast (WCAG AA)
- Don't rely on color alone to convey meaning
- Support `prefers-reduced-motion` media query

### 4. Mobile Optimization
- Touch targets should be at least 44px x 44px
- Reduce animation duration on mobile if needed
- Test with actual mobile devices
- Use `@media (max-width: 480px)` for mobile styles

---

## File Map

### CSS Files Location
```
/frontend/
├── Public/
│   ├── css/
│   │   └── home.css (Landing page styles)
│   ├── admin/ [Change here for admin pages]
│   │   └── css/
│   │       ├── admin.css (Admin dashboard)
│   │       ├── style.css (Admin global)
│   │       └── payment.css (Payment page)
│   ├── User/ [Change here for user pages]
│   │   └── css/
│   │       ├── style.css (User dashboard)
│   │       ├── components.css (Cards, modals, etc)
│   │       ├── pages.css (Hero, filters)
│   │       └── profile.css (Profile page)
│   └── auth/ [Change here for login/signup]
│       └── css/
│           ├── login.css
│           └── signup.css
```

---

## Testing Checklist

Before committing CSS changes:
- [ ] Button appears correct in all states (normal, hover, active)
- [ ] Animation is smooth on desktop (60fps)
- [ ] Animation is smooth on mobile device
- [ ] Focus states visible for accessibility
- [ ] Color contrast meets WCAG AA
- [ ] No console errors in browser
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Mobile responsive breakpoint working

---

## Common Issues & Solutions

### Animation is Janky/Stuttering
**Solution**: Make sure you're only animating `transform` and `opacity`
```css
/* ✅ Good */
transform: translateY(-10px);
opacity: 0.8;

/* ❌ Bad */
top: -10px;
height: 50px;
```

### Button Text Not Centered
**Solution**: Use flexbox on button
```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
```

### Gradient Not Showing on Hover
**Solution**: Make sure ::before pseudo-element isn't hiding it
```css
.btn::before {
  z-index: 0; /* Lower than text */
}

.btn-text {
  position: relative;
  z-index: 1;
}
```

### Focus Outline Not Visible
**Solution**: Make sure you removed outline and added custom focus style
```css
input:focus {
  outline: none; /* Remove default */
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2); /* Add custom */
}
```

---

## Resources

### CSS References
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [CSS Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/)

### Animation Tools
- [Cubic Bezier Generator](https://cubic-bezier.com/)
- [Keyframe Animation Generator](https://keyframes.app/)
- [Gradient Generator](https://gradientgenerator.com/)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessible Colors](https://www.accessible-colors.com/)

---

## Support & Questions

For CSS-related questions or issues:
1. Check this reference guide first
2. Review the UI_ENHANCEMENTS_COMPLETE.md documentation
3. Look at similar implementations in existing CSS files
4. Test in browser dev tools before applying

---

**Last Updated**: February 3, 2026
**Version**: 1.0
