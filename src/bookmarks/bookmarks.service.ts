import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';
import { UpdateBookmarkDTO } from './dto/update-bookmark.dto';
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

    async getAllBookmarks(): Promise<Bookmark[]> {
        return this.bookmarkModel.find().exec();
    }

    async getBookmarkById(id: string): Promise<Bookmark> {
        const bookmark = await this.bookmarkModel.findById(id).exec();

        if (!bookmark) {
            throw new NotFoundException(`Bookmark with id "${id}" not found`);
        }

        return bookmark;
    }

    async updateBookmarkByID(id: string, dto: UpdateBookmarkDTO): Promise<Bookmark> {
        const updateBookmark = await this.bookmarkModel.findByIdAndUpdate(id, dto, { new: true }).exec();

        if (!updateBookmark) {
            throw new NotFoundException(`Bookmark with ID "${id}" not found`);
        }
        return updateBookmark;
    }
}
