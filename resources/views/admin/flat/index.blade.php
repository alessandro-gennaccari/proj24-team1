@extends('layouts.dashboard')

@section('title', 'Your flats')

@section('content')

<div class="container">
    <a href="{{ route('flat.create') }}"><i class="fas fa-plus"></i> New flat</a>

    <table class="table container text-light">
      <thead>
        <tr>
          <th scope="col"><i class="fas fa-hashtag"></i></th>
          <th scope="col"><i class="fas fa-user"></i></th>
          <th scope="col">TITLE</th>
          <th scope="col">CREATED AT</th>
          <th scope="col">UPDATED AT</th>
        </tr>
      </thead>
      <tbody>
        @foreach($flats as $flat)
        <tr>
            <th scope="row">{{ $flat->id }}</th>
            <td>{{ $flat->user->name }}</td>
            <td>{{ $flat->title }}</td>
            <td>{{ $flat->created_at }}</td>
            <td>{{ $flat->updated_at }}</td>
            <td><a class="text-info" href="{{route('flat.show',$flat->id)}}"><i class="fas fa-info-circle"></i></a></td>
            <td><a class="text-warning" href="{{route('flat.edit',$flat->id)}}"><i class="fas fa-edit"></i></a></td>
            <td>
              <form action="{{route('flat.destroy', $flat->id) }}" method="post" class="form-delete">
              @csrf
              @method('DELETE')
                <button type="sumbit" class="text-danger"><i class="fas fa-trash-alt"></i></button>
              </form>
            </td>
        </tr>
        @endforeach
      </tbody>
    </table>
</div>




@endsection