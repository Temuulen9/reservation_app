// src/common/helpers/utils.helper.ts

import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as crypto from "crypto";

@Injectable()
export class Helper {
  constructor(private readonly jwtService: JwtService) {}
  /**
   * Generate a random string
   * @param length number
   * @returns string
   */
  generateRandomString(length: number): string {
    return crypto.randomBytes(length).toString("hex").slice(0, length);
  }

  /**
   * Format Date to YYYY-MM-DD
   * @param date Date
   * @returns string
   */
  formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  /**
   * Check if a value is empty
   * @param value any
   * @returns boolean
   */
  isEmpty(value: any): boolean {
    return (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value.trim() === "") ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === "object" && Object.keys(value).length === 0)
    );
  }

  getPayloadFromToken(token: string) {
    // Remove "Bearer " if token comes with it
    const pureToken = token.replace(/^Bearer\s/, "");

    const payload = this.jwtService.decode(pureToken);
    return payload;
  }
}
