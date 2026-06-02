# {{ .Site.Title }}

{{ .Site.Params.description }}

## Latest Posts

{{ range first 10 (where .Site.RegularPages "Section" "posts") }}
- [{{ .Title }}]({{ .Permalink }})
{{ end }}
