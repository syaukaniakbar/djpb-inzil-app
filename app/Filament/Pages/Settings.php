<?php

namespace App\Filament\Pages;

use Filament\Pages\Page;

class Settings extends Page
{
    protected static bool $shouldRegisterNavigation = false;

    protected string $view = 'filament.pages.settings';
}
