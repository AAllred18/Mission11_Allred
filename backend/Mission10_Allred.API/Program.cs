using Microsoft.EntityFrameworkCore;
using Mission10_Allred.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookstoreDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontEnd",
        policy =>
        {
            //.WithOrigins("http://localhost:3000", "https://bookstore-allred-backend.azurewebsites.net")
             
            policy.WithOrigins("https://delightful-moss-0ba45991e.6.azurestaticapps.net")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
});

var app = builder.Build();

app.UseCors("AllowFrontEnd");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// x => x.WithOrigins("http://localhost:3000")


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
