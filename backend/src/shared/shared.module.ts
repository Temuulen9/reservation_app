import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Helper } from "src/common/helper";

@Module({
  providers: [Helper, JwtService],
  exports: [Helper],
})
export class SharedModule {}
