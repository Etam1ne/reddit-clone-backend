import { Module } from "@nestjs/common";
import { JwtService, JwtModule } from "@nestjs/jwt";
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
import { UserController } from "./user.controller";
import { AuthController } from "./auth.controller";
import { CommunityController } from "./community.controller";
import { CommentController } from "./comment.controller";
import { ArticleController } from "./article.controller";
import { LocalStrategy } from "src/core/use-cases/auth/local/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { jwtConstants } from "src/shared/constants/jwt.contants.ts";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Article, Comment, Community]),
        PassportModule
    ],
    providers: [
        UserService,
        AuthService,
        CommunityService,
        CommentService,
        ArticleService,
        JwtService,
        LocalStrategy,
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