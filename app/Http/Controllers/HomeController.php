<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\Flat;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    // public function __construct()
    // {
    //     $this->middleware('auth');
    // }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Flat $flat)
    {
        $data = [
            'flat' => $flat->all()
        ];
        // dd($data[0]['slug']); it worked perfectly
        return view('guest.home', $data);
    }

    public function search(){
        return view('guest.search');
    }

    public function flat($slug){

        $flatSlug = Flat::where('slug', $slug)->first();
        $data = [
            'flat' => $flatSlug
        ];
        dd($data);
        
        return view('guest.flat.index' , $data);
    }

    public function message(){
        return view('guest.message');
    }

    public function send_message(Request $request){


        $request->validate([
            'email' => 'required|email:rfc,dns',
            'message' => 'required|min:1|max:1000'
        ]);

        // dd($data); it worked smoothly
        $newMessage = new Message();
        // $newMessage->flat_id = $flat->id;
        $newMessage->fill($request->all());
        $newMessage->save();
        

        return redirect()->route('message');
    }


}
