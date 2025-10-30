import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Bookmark, BookmarkSchema } from './schemas/bookmark.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Bookmark.name, schema: BookmarkSchema }]),
  ],
  controllers: [BookmarksController],
  providers: [BookmarksService]
})
export class BookmarksModule { }
