import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload } from './jwt.strategy';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
<<<<<<< HEAD
=======
import { UpdateProfileDto } from './dto/update-profile.dto';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
>>>>>>> 30b9b13 (feat: implement password recovery, optimize database schema, and fix registration flow errors)

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  private readonly googleClient = new OAuth2Client(
    '1016805497943-jffnkdsrck1k8vseu2sn03elq426i6fv.apps.googleusercontent.com',
    process.env.GOOGLE_CLIENT_SECRET,
  );

  async googleLogin(code: string) {
    try {
      const { tokens } = await this.googleClient.getToken({
        code,
        redirect_uri: 'postmessage',
      });
      const ticket = await this.googleClient.verifyIdToken({
        idToken: tokens.id_token!,
        audience: '1016805497943-jffnkdsrck1k8vseu2sn03elq426i6fv.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      if (!payload || !payload.email) throw new UnauthorizedException('Invalid Google token');

      let user = await this.prisma.user.findUnique({ where: { email: payload.email } });
      if (!user) {
        user = await this.prisma.user.create({
          data: {
            email: payload.email,
            firstName: payload.given_name || '',
            lastName: payload.family_name || '',
            passwordHash: '',
          },
        });
      }

      await this.ensureUserCart(user.id);
      const tokensRes = await this.generateTokens(user.id, user.email, user.role);
      return { ...tokensRes, user };
    } catch (e) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (existing) throw new ConflictException('Email already registered');
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phone: dto.phone,
        birthday: dto.birthday ? new Date(dto.birthday) : null,
        gender: dto.gender,
        newsletter: dto.newsletter ?? false,
      },
      select: { id: true, email: true, firstName: true, lastName: true, role: true },
    });
    await this.ensureUserCart(user.id);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return { ...tokens, user };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email.toLowerCase() } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    await this.ensureUserCart(user.id);
    const tokens = await this.generateTokens(user.id, user.email, user.role);
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async refresh(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      if (tokenRecord) await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const tokens = await this.generateTokens(tokenRecord.userId, tokenRecord.user.email, tokenRecord.user.role);
    
    // Revoke old token
    await this.prisma.refreshToken.delete({ where: { id: tokenRecord.id } });

    return tokens;
  }

  private async generateTokens(userId: string, email: string, role: string) {
    const accessToken = this.sign(userId, email, role);
    const refreshToken = crypto.randomBytes(64).toString('hex');
    
    // Store refresh token with 7 days expiry
    await this.prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      }
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async profile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, firstName: true, lastName: true, phone: true, role: true, createdAt: true },
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }

<<<<<<< HEAD
=======
  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const data: any = {};
    if (dto.firstName !== undefined) data.firstName = dto.firstName?.trim() || null;
    if (dto.lastName !== undefined) data.lastName = dto.lastName?.trim() || null;
    if (dto.phone !== undefined) data.phone = dto.phone?.trim() || null;
    if (dto.gender !== undefined) data.gender = dto.gender;
    if (dto.newsletter !== undefined) data.newsletter = dto.newsletter;
    if (dto.birthday !== undefined) {
      data.birthday = dto.birthday ? new Date(dto.birthday) : null;
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data,
      select: { 
        id: true, 
        email: true, 
        firstName: true, 
        lastName: true, 
        phone: true, 
        birthday: true,
        gender: true,
        newsletter: true,
        role: true, 
        createdAt: true 
      },
    });

    return user;
  }

>>>>>>> 30b9b13 (feat: implement password recovery, optimize database schema, and fix registration flow errors)
  private sign(sub: string, email: string, role: string) {
    const payload: JwtPayload = { sub, email, role };
    return this.jwt.sign(payload);
  }

  /** One cart row per user (schema: userId @unique). */
  private async ensureUserCart(userId: string) {
    const cart = await this.prisma.cart.findFirst({
      where: { userId, status: 'ACTIVE' },
      orderBy: { updatedAt: 'desc' },
    });
    if (!cart) {
      await this.prisma.cart.create({ data: { userId, status: 'ACTIVE' } });
    }
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal if user exists for security, just say if success
      return { message: 'If your email is registered, you will receive a reset link.' };
    }

    // Create token
    const token = uuidv4();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry

    await this.prisma.passwordReset.upsert({
      where: { token }, // This is technically unique, but we want to clean up old ones for this email usually. 
      // For simplicity in this demo, just create. 
      create: {
        email,
        token,
        expiresAt,
      },
      update: {
        token,
        expiresAt,
      },
    });

    try {
      await this.mailService.sendPasswordResetEmail(email, token);
    } catch (error) {
      console.error('Mail error:', error);
      throw new Error('Failed to send email');
    }

    return { message: 'If your email is registered, you will receive a reset link.' };
  }

  async resetPassword(dto: any) {
    const { token, password } = dto;

    const resetRecord = await this.prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!resetRecord || resetRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Token is invalid or expired');
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { email: resetRecord.email },
        data: { passwordHash },
      }),
      this.prisma.passwordReset.delete({
        where: { id: resetRecord.id },
      }),
    ]);

    return { success: true, message: 'Password reset successful' };
  }
}
