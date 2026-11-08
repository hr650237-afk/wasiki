pooooooo — Scratch 作品の PWA 版
====================================

このフォルダは sb3-to-pwa で作りました。中身をそのまま Web サーバー
（GitHub Pages など）に置くと、iPhone や Android のホーム画面に追加できる
アプリとして動きます。

入っているファイル
  index.html            アプリのページ（作品を表示する）
  player.js             作品を読み込んで動かす
  project.sb3           作品のファイル
  scaffolding-min.js    Scratch の作品を動かす部品（TurboWarp）
  manifest.webmanifest  アプリの名前・色・アイコンの設定
  sw.js                 オフラインでも起動できるようにする仕組み
  icons/                アプリのアイコン
  LICENSES/             部品のライセンス

GitHub Pages で公開する手順（くわしくは記事を見てください）
  1. GitHub で新しいリポジトリを作る（Public）
  2. 「Add file」→「Upload files」で、このフォルダの中身を全部アップロードする
     （フォルダごとではなく、index.html がリポジトリのいちばん上に来るように）
  3. 「Settings」→「Pages」で、Branch を main・/(root) にして Save
  4. 数分待ってから、表示された URL を iPhone の Safari で開く
  5. 共有ボタン →「ホーム画面に追加」

作品を直したとき
  sb3-to-pwa でもう一度変換して、ファイルを全部アップロードし直します。
  アプリを一度閉じて開き直すと、新しい版に入れ替わります。

注意
  - Scratch の公式サイトでは、ステージの大きさは変えられません。この
    アプリは TurboWarp と同じ仕組みで動いています。
  - 作品をインターネットに公開することになります。他の人の作品を使う
    ときは、作った人の許可とライセンスを確かめてください。
