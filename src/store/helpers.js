export default function getFacetsFromEnv() {
  return [...process.env.VUE_APP_CHECKBOX_FACETS.split(';'), ...process.env.VUE_APP_DROPDOWN_FACETS.split(';')];
}
