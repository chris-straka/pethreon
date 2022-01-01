#!/bin/sh

if [ ! -f $1 ]; then
  echo "not a file"
  echo $1
  exit 1
fi

# Non-exhaustive, I'll add more as I go on

sed -i "
  s/stroke-miterlimit/strokeMiterlimit/g;
  s/stroke-width/strokeWidth/g
  s/stroke-linecap/strokeLinecap/g
  s/stroke-linejoin/strokeLinejoin/g
" $1


exit 0
