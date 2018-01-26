export function createViewsWithCommonIncludes(
  content,
  header = HeaderComponent,
  footer = FooterComponent,
  sidebar = SidebarComponent
  ) {
  return {
    'header': header,
    'content': content,
    'footer': footer,
  }
}
