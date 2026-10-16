Gasp Factor rating. Use the badge on card imagery, compact stats in card footers, and the full version on the review page.
```jsx
<GaspFactor size="badge" score={8.03} suspense={97} scariness={89} bloodiness={55} />
<GaspFactor size="compact" score={8.03} suspense={97} scariness={89} bloodiness={55} />
<GaspFactor score={8.03} suspense={97} scariness={89} bloodiness={55} />
```
The order is fixed: suspense (grimace), scariness (surprised), bloodiness (drops). Red is reserved for the score signal.