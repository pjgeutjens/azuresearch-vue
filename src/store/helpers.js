export default function getFacetsFromEnv() {
  return process.env.VUE_APP_CHECKBOX_FACETS.split(';');
}
