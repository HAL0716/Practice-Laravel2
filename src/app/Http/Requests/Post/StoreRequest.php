<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'body' => ['required', 'string', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'body.required' => '本文を入力してください。',
            'body.string' => '本文は文字列でなければなりません。',
            'body.max' => '本文は500文字を超えてはいけません。',
        ];
    }
}
