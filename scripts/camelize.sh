#!/bin/sh

# This script takes an SVG file that uses kebab case attributes (foo-bar) 
# and transforms them into their camelCase equivalent for react (fooBar)

if [ ! -f $1 ]; then
  echo "not a file"
  echo $1
  exit 1
fi

# Non-exhaustive 
# -i means inplace instead of stdout
sed -i "
  s/stroke-miterlimit/strokeMiterlimit/g;
  s/stroke-width/strokeWidth/g
  s/stroke-linecap/strokeLinecap/g
  s/stroke-linejoin/strokeLinejoin/g
" $1

exit 0
