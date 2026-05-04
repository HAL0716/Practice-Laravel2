<?php

namespace App\Http\Requests\Post;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'body' => ['required', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'body.required' => '本文を入力してください。',
            'body.string' => '本文は文字列でなければなりません。',
            'body.max' => '本文は255文字を超えてはいけません。',
        ];
    }
}
