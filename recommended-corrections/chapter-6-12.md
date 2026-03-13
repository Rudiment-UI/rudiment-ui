# UI Components & React Aria (Chapters 6-12)

## Small polish items (Low-Medium):

- Button and IconButton duplicate the `isLoading` logic. Extract a shared `useLoadingButton` hook or compound component pattern.
- Input does not forward ref to the underlying `<input>` (minor DX issue for focus control).
- No `forwardRef` anywhere in interactive components yet
