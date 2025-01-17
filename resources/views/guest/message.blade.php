@extends('layouts.app')

@section('title', 'Airbnb | Conferma messaggio')

@section('content')

<section class="message_result container fade-in">
    <h1>Il messaggio è stato inviato correttamente <i class="far fa-check-circle"></i></h1>



    <div class="message_content">
        <p class="p_margin_b"><i class="far fa-envelope"></i> : <strong class="email_message">{{ $message->email }}</strong></p>
        <p class="p_margin_b"><i class="fas fa-home"></i> : {{ $message->flat->title }}</p>
        <div class="text_message">
            {{-- <p><i class="far fa-envelope"></i> : {{ $message->message }}</p> --}}
            <p><i class="far fa-comment-alt"></i> : {{ $message->message }}</p>


        </div>
        <p><small><em><i class="fas fa-info-circle"></i> Il proprietario ti risponderà direttamente alla mail fornita
</section>

@endsection
