---
productId: base-ui
title: React Tabs components
components: TabsRoot, TabPanel, Tab, TabsList, TabIndicator
hooks: useTabsRoot, useTabPanel, useTab, useTabsList, useTabIndicator
githubLabel: 'component: tabs'
waiAria: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
---

# Tabs

<p class="description">Tabs organize groups of related content and let users navigate between them.</p>

{{"component": "modules/components/ComponentLinkHeader.js", "design": false}}

{{"component": "modules/components/ComponentPageTabs.js"}}

{{"demo": "UnstyledTabsIntroduction", "defaultCodeOpen": false, "bg": "gradient"}}

## Installation

Base UI components are all available as a single package.

<codeblock storageKey="package-manager">

```bash npm
npm install @base_ui/react
```

```bash yarn
yarn add @base_ui/react
```

```bash pnpm
pnpm add @base_ui/react
```

</codeblock>

Once you have the package installed, import the component.

```ts
import * as Tabs from '@base_ui/react/Tabs';
```

## Anatomy

Tabs are implemented using a collection of related components:

- `<Tabs.Root />` is a top-level component that wraps the Tabs List and Tab Panel components so that tabs and their panels can communicate with one another.
- `<Tabs.Tab />` is the tab element itself. Clicking on a tab displays its corresponding panel.
- `<Tabs.List />` is the container that houses the tabs. Responsible for handling focus and keyboard navigation between tabs.
- `<Tabs.Panel />` is the card that hosts the content associated with a tab.
- `<Tabs.Indicator />` is an optional active tab indicator.

```tsx
<Tabs.Root>
  <Tabs.List>
    <Tabs.Tab>One</Tabs.Tab>
    <Tabs.Tab>Two</Tabs.Tab>
    <Tabs.Indicator />
  </Tabs.List>
  <Tabs.Panel>First page</Tabs.Panel>
  <Tabs.Panel>Second page</Tabs.Panel>
</Tabs.Root>
```

## Specifying values

By default, Tab components and their corresponding panels are zero-indexed.
The first tab has a `value` of `0`, the second tab has a `value` of `1`, and so on.
Activating a tab opens the panel with the same `value`, corresponding to the order in which each component is nested within its container.

Though not required, you can add the `value` prop to the Tab and Tab Panel to control how these components are associated.

```tsx
<Tabs.Root defaultValue={1}>
  <Tabs.List>
    <Tabs.Tab value={1}>One</Tabs.Tab>
    <Tabs.Tab value={2}>Two</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value={1}>First page</Tabs.Panel>
  <Tabs.Panel value={2}>Second page</Tabs.Panel>
</Tabs.Root>
```

## Composing a custom React component

Use the `render` prop to override the rendered element:

```jsx
<Tabs.Tab render={<MyCustomTab />} />
// or
<Tabs.Tab render={(props) => <MyCustomTab {...props} />} />
```

If you provide a non-interactive element such as a `<span>`, the Tab components automatically add the necessary accessibility attributes.

## Indicator

Though it's optional, the `Tabs.Indicator` component can be added to implement a visual indicator for the active tab.
To help with styling—in particular animating its position—some CSS variables are provided.

- `--active-tab-top` is the distance in `px` between the top of the active tab and the top of the `Tabs.Panel`'s bounding box.
- `--active-tab-bottom` is the distance in `px` between the bottom of the active tab and the bottom of the `Tabs.Panel`'s bounding box.
- `--active-tab-left` is the distance in `px` between the left-hand edge of the active tab and the left-hand edge of the `Tabs.Panel`'s bounding box.
- `--active-tab-right` is the distance in `px` between the right-hand edge of the active tab and the right-hand edge of the `Tabs.Panel`'s bounding box.
- `--active-tab-width` is the width in `px` of the active tab's bounding box.
- `--active-tab-height` is the height in `px` of the active tab's bounding box.

Additionally, the Indicator has the `data-activation-direction` attribute representing the relation of the selected tab to the previously selected one.
Its value is one of the following:

- `left` when the active tab is to the left of the previously active tab (only applied when `orientation=horizontal`).
- `right` when the active tab is to the right of the previously active tab (only applied when `orientation=horizontal`).
- `top` when the active tab is above the previously active tab (only applied when `orientation=vertical`).
- `bottom` when the active tab is below the previously active tab (only applied when `orientation=vertical`).
- `none` when there is no previously selected tab.

This example uses the CSS variables and data attributes described above to create an "elastic" movement effect.

{{"demo": "IndicatorBubble.js", "defaultCodeOpen": false}}

The next example shows a differently shaped Indicator with a simpler movement.
As the transition is independent of direction, the `data-activation-direction` attribute is not used for styling.

{{"demo": "IndicatorUnderline.js", "defaultCodeOpen": false }}

### Server rendering

The Indicator's rendering depends on React effects and cannot be done on the server.
This means that if you're using server-side rendering (SSR), the initially rendered content will not contain the Indicator.
It will appear after React hydrates the components.

If you want to minimize the time the Indicator is not visible, you can set the `renderBeforeHydration` prop to `true`.
This will make the component include an inline script that sets the CSS variables as soon as it's rendered by the browser.

```tsx
<Tabs.Indicator renderBeforeHydration />
```

It is disabled by default, as the script contributes to the size of the payload sent by the server.

## Orientation

To arrange tabs vertically, set `orientation="vertical"` on the `<Tabs />` component.
Now, the user can navigate with the up and down arrow keys rather than the default left-to-right behavior for horizontal tabs.

## Links

Tabs can be rendered as links to routes in your application.
A common use case for tabs is implementing client-side navigation that doesn't require an HTTP round-trip to the server.

{{"demo": "UnstyledTabsRouting.js", "defaultCodeOpen": false}}

## Manual tab activation

By default, when using keyboard navigation, tabs are activated automatically when they receive focus.
Alternatively, you can set `activateOnFocus={false}` on `<Tabs.List>` so tabs are not activated automatically when they receive focus.

```tsx
<Tabs.List activateOnFocus={false} />
```

## Accessibility

Base UI Tabs follow the [Tabs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).

### Keyboard navigation

| Key                                                        | Function                                                                                                        |
| :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| <kbd class="key">Left arrow</kbd>                          | Moves focus to the previous tab (when `orientation="horizontal"`) and activates it if `activateOnFocus` is set. |
| <kbd class="key">Right arrow</kbd>                         | Moves focus to the next tab (when `orientation="horizontal"`) and activates it if `activateOnFocus` is set.     |
| <kbd class="key">Up arrow</kbd>                            | Moves focus to the previous tab (when `orientation="vertical"`) and activates it if `activateOnFocus` is set.   |
| <kbd class="key">Down arrow</kbd>                          | Moves focus to the next tab (when `orientation="vertical"`) and activates it if `activateOnFocus` is set.       |
| <kbd class="key">Space</kbd>, <kbd class="key">Enter</kbd> | Activates the focused tab.                                                                                      |

### Labeling

To make the Tabs component suite accessible to assistive technology, label the `<Tabs.List />` element with `aria-label`.

```tsx
<Tabs>
  <Tabs.List aria-label="Seasons">
    <Tabs.Tab>Spring</Tabs.Tab>
    <Tabs.Tab>Summer</Tabs.Tab>
    <Tabs.Tab>Fall</Tabs.Tab>
    <Tabs.Tab>Winter</Tabs.Tab>
  </Tabs.List>
</Tabs>
```
