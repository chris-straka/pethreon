#!/bin/bash

# Non-exhaustive, I'll add more as I go on

if [ ! -f $1 ]; 
  then 
    echo "not a file"
    echo $1
    exit 1
fi

# stroke-miterlimit -> strokeMiterlimit
sed -i "s/stroke-miterlimit/strokeMiterlimit/g" $1

# stroke-width -> strokeWidth
sed -i "s/stroke-width/strokeWidth/g" $1

# stroke-linecap -> strokeLinecap
sed -i "s/stroke-linecap/strokeLinecap/g" $1

# stroke-linejoin -> strokeLinejoin
sed -i "s/stroke-linejoin/strokeLinejoin/g" $1

exit 0