<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Department extends Model
{
    protected $fillable = [
        'name',
        'code',
    ];

    public function user()
    {
        return $this->hasOne(User::class);
    }
}

    
