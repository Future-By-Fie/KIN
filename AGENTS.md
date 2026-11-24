<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep fictional fixtures and matching behind the typed `src/lib/kin` service adapter so a future API can replace it without changing screens.
- Store prototype preferences in a root React context and demo requests/messages in browser-triggered memory only; no accounts, location collection, or persistent backend is required for this synthetic prototype.
- Use individual TanStack routes for each shareable screen and route-specific noindex metadata to keep the concept navigation clear and discourage indexing.
- Identity-returning service methods must require both parties' consent; anonymous match methods never return profile identities.
- Origin data lives in `src/lib/kin/origins.ts` with a provenance on every item; DNA claims render only as estimates and require separate, withdrawable consent, because KIN must never present uncertain data as fact.