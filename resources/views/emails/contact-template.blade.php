<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd;">
    <div style="background-color: #030169; padding: 20px; text-align: center;">
        <img src="https://raw.githubusercontent.com/Mikelesnr/aligned-surveyors/refs/heads/mike-linux/public/images/logo.png" 
            alt="Aligned Surveyors Logo" 
            style=" height: 50px; display: block; margin: 0 auto;">
        
        <h1 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 700; text-transform: uppercase;">
            Aligned 
            <span style="color: #7876eb;">Surveyors</span>
        </h1>
    </div>  
    <div style="padding: 20px; color: #333;">
        @if($isAutoResponse)
            <h2>Thank you, {{ $data['name'] }}!</h2>
            <p>We have received your message and will get back to you shortly.</p>
        @else
            <h2>New Inquiry from {{ $data['name'] }}</h2>
            <p><strong>Email:</strong> {{ $data['email'] }}</p>
            <p><strong>Message:</strong> {{ $data['message'] }}</p>
        @endif
    </div>
    <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px;">
        &copy; {{ date('Y') }} Aligned Surveyors. All rights reserved.
    </div>
</div>