// CloudFront Function (viewer-request): rewrites directory-style URIs to
// their index.html, since CloudFront's default_root_object only applies to
// the literal distribution root ("/"), never to subdirectories --
// confirmed at docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/DefaultRootObject.html.
// This site is a multi-page static build (not a client-routed SPA), so each
// directory-style path maps to its own real index.html at the origin.
// Pattern from AWS's own example:
// docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/example-function-add-index.html
async function handler(event) {
  var request = event.request;
  var uri = request.uri;

  if (uri.endsWith('/')) {
    request.uri += 'index.html';
  } else if (!uri.includes('.')) {
    request.uri += '/index.html';
  }

  return request;
}
