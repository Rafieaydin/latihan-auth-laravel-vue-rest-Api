<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('role')->insert([
                [
                    'nama_role' => 'admin'
                ],
                [
                    'nama_role' => 'siswa'
                ],
        ]);
    }
}
