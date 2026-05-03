# Practice-Laravel2

## 起動手順

```bash
# コンテナ起動
docker compose up -d

# PHP依存パッケージインストール
docker compose exec app composer install

# マイグレーション実行
docker compose exec app php artisan migrate

# フロント依存パッケージインストール
docker compose exec node npm install

# フロントビルド（開発）
docker compose exec node npm run dev
```

## コード整形

```bash
＃ Prettierでコード整形
docker compose exec node npx prettier . --write
```
