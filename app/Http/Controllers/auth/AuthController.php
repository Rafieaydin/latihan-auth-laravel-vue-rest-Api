<?php

namespace App\Http\Controllers\auth;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\auth\AuthRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
// validasi
use Illuminate\Support\Facades\Validator;

// jwt auth
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([ // validated login
            'email' => 'required|email',
            'password' => 'required',
        ]);
        // jika email dah password benar
        if (Auth::attempt($request->only('email','password'))) {
            $status = true;
            $user = Auth::user();
            $response = [
                        // gabungin array jadi isinya json
                        // seperti ini contohnya
                         //    "user": {
                        //     "id": 1,
                        //     "name": "joko",
                        //     "email": "joko@gmail.com",
                        //     "email_verified_at": null,
                        //     "created_at": null,
                        //     "updated_at": null,
                        //     "roles": [
                        //         {
                        //             "id": 1,
                        //             "nama_role": "admin",
                        //             "created_at": null,
                        //             "updated_at": null,
                        //             "pivot": {
                        //                 "id_role": 1,
                        //                 "id_user": 1
                        //             }
                        //         }
                        //     ]
                        // },
                'user' => array_merge(
                    $user->toArray(),
                    ['roles' => $user->role()->get()->toArray()]
                ),
                'token' => JWTAuth::fromUser($user),
            ];
            // return response
            // status berhasil
            return response()->json(compact('status', 'response'));
        }else {
            // ini untuk erorr
            $errors = [
                'email' => ['Email or Password is incorrect'],
                'password' => ['Email or Password is incorrect'],
            ];
            return response()->json(compact('errors'), 402);
        }


    }
    public function register(AuthRequest $request)
    {
        $request->validated(); // validate biasa
        if ($request->password === $request->confrim_password) {
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
            // masukin role di user baru
            $user->role()->attach(2);
            return response()->json(['pesan' => 'data berhasil di tambahkan']);
        } else {
            $errors = [
                'password' => ['Password or Confrim password is incorrect'],
                'confrim_password' => ['Password or Confrim password is incorrect']
            ];
            return response()->json(compact('errors'), 402);
        }
    }

    public function logout(request $request){
        Auth::logout();
        return response()->json(['status'=>'berhasil','pesan' => 'anda berhasil logout']);
    }
}
