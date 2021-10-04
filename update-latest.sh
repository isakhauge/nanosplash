#!/usr/bin/env bash
PACKAGES=(
  @vitejs/plugin-vue
  @vue/compiler-sfc
  autoprefixer
  cssnano
  postcss
  sass
  typedoc
  typescript
  vite
  vite-plugin-singlefile
)

PACKAGE_STR=""

for package in ${PACKAGES[@]}
do PACKAGE_STR+=" $package@latest"
done

yarn add -D $PACKAGE_STR