import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getUsers() {
    const { data, error } = await this.supabaseService.client
      .from('administrador')
      .select('*');
    if (error) throw error;
    return data;
  }

  async addUser(user: { name: string; email: string }) {
    const { data, error } = await this.supabaseService.client
      .from('administrador')
      .insert(user)
      .select();
    if (error) throw error;
    return data;
  }
}