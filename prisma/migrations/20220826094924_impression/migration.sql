-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT,
    "type" TEXT NOT NULL,
    "thumb_nail_url" TEXT,
    "excerpt" TEXT,
    "content_path" TEXT NOT NULL,
    "md5_hash" TEXT NOT NULL,
    "published" BOOLEAN DEFAULT false,
    "publish_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impressions" (
    "id" TEXT NOT NULL,
    "sticker" VARCHAR(10) NOT NULL,
    "comment" VARCHAR(1000),
    "twitter_id" VARCHAR(100),
    "post_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "impressions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_content_path_key" ON "posts"("content_path");

-- CreateIndex
CREATE INDEX "posts_content_path_idx" ON "posts"("content_path");

-- AddForeignKey
ALTER TABLE "impressions" ADD CONSTRAINT "impressions_postId_fkey" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
