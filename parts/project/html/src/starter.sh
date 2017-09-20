#!/bin/sh
##
##
func() {
  os="error"
  ver="error"

  if [ -e /etc/lsb-release ]; then
    os="ubuntu"
    ver=`command lsb_release -rs`
  elif [ -e /etc/rpi-issue ]; then
    os="raspbian"
    ver=`cat /etc/debian_version`
  fi
  
}

func
echo $os / $ver

sudo apt-get update
sudo apt-get install git

git clone https://github.com/m0kimura/config

echo ub16base.shなどのセットアップツールが利用できるようになりました。
cat ./config/README.md

export PATH=$PATH:$HOME/config
##end##

