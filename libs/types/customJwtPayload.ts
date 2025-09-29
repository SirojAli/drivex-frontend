import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  _id: string;
  memberType: string;
  memberStatus: string;
  memberAuthType: string;
  memberEmail: string;
  memberPhone: string;
  memberNick: string;

  // Optional fields
  memberFullName?: string;
  memberImage?: string;
  memberVideoUrl?: string;
  memberAddress?: string;
  memberDescription?: string;

  // Stats
  memberRank?: number;
  memberArticles?: number;
  memberPoints?: number;
  memberCars?: number;
  memberLikes?: number;
  memberViews?: number;
  memberWarnings?: number;
  memberBlocks?: number;
  brandSlug?: string;
}
