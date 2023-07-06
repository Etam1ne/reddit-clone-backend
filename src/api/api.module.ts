import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleService } from "src/core/services/article.service";
import { AuthService } from "src/core/services/auth.service";
import { CommentService } from "src/core/services/comment.service";
import { CommunityService } from "src/core/services/community.service";
import { UserService } from "src/core/services/user.service";
import { Article } from "src/infra/postgres/entities/article.entity";
import { Comment } from "src/infra/postgres/entities/comment.entity";
import { Community } from "src/infra/postgres/entities/community.entity";
import { User } from "src/infra/postgres/entities/user.entity";
import { UserController } from "./user/user.controller";
import { AuthController } from "./auth/auth.controller";
import { CommunityController } from "./community/community.controller";
import { CommentController } from "./comment/comment.controller";
import { ArticleController } from "./article/article.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Article, Comment, Community])],
    providers: [
        UserService,
        AuthService,
        CommunityService,
        CommentService,
        ArticleService,
        JwtService,
    ],
    controllers: [
        UserController,
        AuthController,
        CommunityController,
        CommentController,
        ArticleController,
    ]
})
export class ApiModule {};