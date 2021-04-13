<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'brandName' => 'required',
            'type' => 'required',
            'childCategory' => 'required',
            'productName' => 'required',
            'productCode' => 'required',
            'description' => 'required',
            'materialDescription' => 'required',
            'price' => 'required|numeric|between:0.01,9999.99',
            'colorNqty' => 'required',
            'sizeNqty' => 'required',
            'image' => 'image|mimes:jpg,png,jpeg|max:5000',
        ];
    }
}
