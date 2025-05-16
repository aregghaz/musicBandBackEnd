<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\AboutUsNewsCollection;
use App\Http\Resources\AlbumCollection;
use App\Http\Resources\BandMemberCollection;
use App\Http\Resources\BlogCollection;
use App\Http\Resources\ConcertCollection;
use App\Http\Resources\ContactCollection;
use App\Http\Resources\GalleryCategoryCollection;
use App\Http\Resources\LatestAlbumCollection;
use App\Http\Resources\SettingsCollection;
use App\Http\Resources\SlidersCollection;
use App\Http\Resources\UpcomingTourSectionCollection;
use App\Http\Resources\UpcomingTourSummaryCollection;
use App\Models\AboutUsNews;
use App\Models\Album;
use App\Models\BandMember;
use App\Models\Blog;
use App\Models\Concert;
use App\Models\Contact;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\LatestAlbum;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\UpcomingTourSection;
use Illuminate\Http\JsonResponse;

class HomeApiController extends Controller
{
    /**
     * Get all data for the homepage.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        $albums = Album::all();
        $albumsData = new AlbumCollection($albums);


        $bandMembers = BandMember::all();
        $bandMembersData = new BandMemberCollection($bandMembers);


        $blogs = Blog::latest()->take(3)->get();
        $blogsData = new BlogCollection($blogs);

        $aunews = AboutUsNews::latest()->take(3)->get();
        $aunewsData = new AboutUsNewsCollection($aunews);

        $concerts = Concert::all();
        $concertsData = new ConcertCollection($concerts);

        // $types = ['Booking', 'Press', 'Info'];
        $types = ['Booking', 'Info'];
        // $contacts = Contact::whereIn('type', $types)
        // ->orderByRaw("FIELD(type, 'Booking', 'Press', 'Info')")
        // ->get();
        $contacts = Contact::whereIn('type', $types)
            ->orderByRaw("FIELD(type, 'Booking', 'Info')")
            ->get();
        $contactsData = new ContactCollection($contacts);


        $galleries = GalleryCategory::select('id', 'folder_name','gallery_category_image')->get();
        $galleriesData = new GalleryCategoryCollection($galleries);


        $latestAlbum = LatestAlbum::with('songs')->first();
        $latestAlbumData = new LatestAlbumCollection($latestAlbum);


        $settings = Setting::first();
        $sliders = Slider::all();
        $settingsData = new SettingsCollection($settings, $sliders);


        $upcomingTourSections = UpcomingTourSection::with('tours')->get();
        $upcomingTourSectionsData = new UpcomingTourSectionCollection($upcomingTourSections);


        $upcomingTourSection = UpcomingTourSection::with('tours')->first();
        $setting = Setting::first();
        $upcomingTourSummaryData = new UpcomingTourSummaryCollection($upcomingTourSection, $setting);


        $homeData = [
            'albums' => $albumsData,
            'bandMembers' => $bandMembersData,
            'blogs' => $blogsData,
            'aboutUsNews' => $aunewsData,
            'contacts' => $contactsData,
            'concerts' => $concertsData,
            'galleries' => $galleriesData,
            'latestAlbum' => $latestAlbumData,
            'settings' => $settingsData,
            'sliders' => new SlidersCollection($sliders),
            'upcomingTourSection' => $upcomingTourSectionsData,
            'upcomingTourSummary' => $upcomingTourSummaryData,
        ];

        return response()->json([
            'data' => $homeData,
            'status' => 'success',
            'message' => 'Homepage data retrieved successfully',
        ], 200);
    }
}
