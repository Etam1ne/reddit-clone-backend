import { CreateCommunityDto } from "./create-community.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateCommunityDto extends PartialType(CreateCommunityDto) {}