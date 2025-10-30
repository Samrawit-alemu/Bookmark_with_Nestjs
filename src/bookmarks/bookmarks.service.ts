import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { Bookmark } from './schemas/bookmark.schema';

@Injectable()
export class BookmarksService {
    // Inject the model
    constructor(
        @InjectModel(Bookmark.name) private bookmarkModel: Model<Bookmark>,
    ) { }
    // method that handle the logic
    async createBookmark(dto: CreateBookmarkDTO): Promise<Bookmark> {
        const newBookmark = new this.bookmarkModel(dto);
        return newBookmark.save()
    }



}
