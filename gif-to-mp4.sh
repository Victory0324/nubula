#!/bin/bash
set -e

mkdir tmp-gif-to-mp4
cp $1 tmp-gif-to-mp4
cd tmp-gif-to-mp4
ffmpeg -i $1 -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" out.mp4
mv out.mp4 $2
cd ..
rm -rf tmp-gif-to-mp4