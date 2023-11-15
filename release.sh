version=${1#refs/tags/v}
###
 # @Author: Vincent Young
 # @Date: 2023-11-15 11:43:18
 # @LastEditors: Vincent Young
 # @LastEditTime: 2023-11-15 11:43:21
 # @FilePath: /bob-plugin-universal/release.sh
 # @Telegram: https://t.me/missuo
 # @GitHub: https://github.com/missuo
 # 
 # Copyright © 2023 by Vincent, All Rights Reserved. 
### 
zip -r -j bob-plugin-universal-$version.bobplugin src/*

sha256_universal=$(sha256sum bob-plugin-universal-$version.bobplugin | cut -d ' ' -f 1)
echo $sha256_universal

download_link="https://github.com/missuo/bob-plugin-universal/releases/download/v$version/bob-plugin-universal-$version.bobplugin"

new_version="{\"version\": \"$version\", \"desc\": \"Fix some prompt errors.\", \"sha256\": \"$sha256_universal\", \"url\": \"$download_link\", \"minBobVersion\": \"0.5.0\"}"

json_file='appcast.json'
json_data=$(cat $json_file)

updated_json=$(echo $json_data | jq --argjson new_version "$new_version" '.versions += [$new_version]')

echo $updated_json > $json_file
mkdir dist
mv *.bobplugin dist