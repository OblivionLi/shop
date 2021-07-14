<p align="center">Shop</p>

## About Project

The project represents an online clothing store with dynamic types (men/women/kids/offers), dynamic parent categories for individual types (topwear/bottomwear etc..), dynamic child categories for individual parent categories in relation with types (t-shirt/pants etc..). 

Has its own CMS system built from scratch that an admin can handle anything on the front-end and has a simple analytic charts (for users and orders paid).

Also contains a complete user authentication with authorization (user can register/login/logout/forgot-pass | user can have custom roles with custom permissions that allows them to view all content from the admin space or limited access) (USER -> ROLES -> PERMISSIONS).

A chart system built from scratch that handles prices/discounts/taxes automatically and decreases the quantities from colors/sizes/products too when the order is placed.

Stripe is used as a payment integration gateway for handling orders payment.

## Main Technologies Used

<ul>
    <li>PHP (Laravel)</li>
    <li>React + React-Redux</li>
    <li>Material UI</li>
    <li>SCSS</li>
</ul>

## .env important settings

<ul>
    <li>MAIL settings (i used mailtrap for testing purposes)</li>
    <li>STRIPE_KEY=</li>
    <li>STRIPE_SECRET=</li>
    <li>CASHIER_CURRENCY=</li>
</ul>

## TODO (for future)

<ul>
    <li>Improve SEO (better urls, add sluggable package for laravel maybe)</li>
    <li>Better API routes and JSON data format</li>
    <li>Better files organization</li>
    <li>???</li>
</ul>


### You can check out my video presentation of the project here

- **[Click Me](https://www.youtube.com/watch?v=wymmusy0T3Y)**