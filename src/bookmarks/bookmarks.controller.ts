import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDTO } from './dto/create-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
    //constructor used to ask for the service
    constructor(private bookmarksService: BookmarksService) { }

    // method for the endpoint
    @Post()
    createBookmark(@Body() dto: CreateBookmarkDTO) {
        return this.bookmarksService.createBookmark(dto);
    }

    @Get()
    getAllBookmarks() {
        return this.bookmarksService.getAllBookmarks();
    }

    @Get(':id')
    getBookmarkByID(@Param('id') id: string) {
        return this.bookmarksService.getBookmarkById(id);
    }
}
