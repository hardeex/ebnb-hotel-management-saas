<?php

namespace App\Console\Commands;

use App\Models\Hotel;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use App\Models\InspectedHotel;

class AddHotelsToInspectedHotels extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:add-hotels-to-inspected-hotels';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Add hotels created three months ago to inspected hotels';


    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Find hotels created three months ago
        $threeMonthsAgo = Carbon::now()->subMonths(3);
        $newHotels = Hotel::where('created_at', '<=', $threeMonthsAgo)->get();

        // Add the hotels to "inspected hotels"
        foreach ($newHotels as $hotel) {
            $inspectedHotel = new InspectedHotel([
                'hotel_id' => $hotel->id,
                'inspection_date' => now(),
            ]);
            $inspectedHotel->save();
        }

        $this->info('Hotels added to inspected hotels successfully.');
    }
}
