#!/bin/bash
dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
dist="$( cd "$( dirname "${BASH_SOURCE[0]}" )/../dist" && pwd )/"

aws s3 sync ${dist} s3://donsuhr.com-pokemon \
  --profile ec2-user \
  --exclude "screen1.jpg" \
  --exclude "screen2.jpg" \
  --exclude "thumb.jpg" \
  --exclude "*.DS_Store*" \
  --delete

AWS_PAGER="bat -l json" aws cloudfront create-invalidation \
  --distribution-id EIC3A1EXAKPYU \
  --paths "/index.html" "/sw.js"
