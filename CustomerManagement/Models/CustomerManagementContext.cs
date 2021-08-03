using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace CustomerManagement.Models
{
    public partial class CustomerManagementContext : DbContext
    {
        public CustomerManagementContext()
        {
        }

        public CustomerManagementContext(DbContextOptions<CustomerManagementContext> options)
            : base(options)
        {
        }

        public virtual DbSet<AspNetRoleClaims> AspNetRoleClaims { get; set; }
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUserClaims> AspNetUserClaims { get; set; }
        public virtual DbSet<AspNetUserLogins> AspNetUserLogins { get; set; }
        public virtual DbSet<AspNetUserRoles> AspNetUserRoles { get; set; }
        public virtual DbSet<AspNetUserTokens> AspNetUserTokens { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<TblAdmin> TblAdmin { get; set; }
        public virtual DbSet<TblCountry> TblCountry { get; set; }
        public virtual DbSet<TblRole> TblRole { get; set; }
        public virtual DbSet<TblUser> TblUser { get; set; }
        public virtual DbSet<TblUserDetails> TblUserDetails { get; set; }
        public virtual DbSet<ViewCustomers> ViewCustomers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=CustomerManagement;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetRoleClaims>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetRoleClaims)
                    .HasForeignKey(d => d.RoleId);
            });

            modelBuilder.Entity<AspNetRoles>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Name).HasMaxLength(256);

                entity.Property(e => e.NormalizedName).HasMaxLength(256);
            });

            modelBuilder.Entity<AspNetUserClaims>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserClaims)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserLogins>(entity =>
            {
                entity.HasKey(e => new { e.LoginProvider, e.ProviderKey });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserLogins)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserRoles>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.RoleId });

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.RoleId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserRoles)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUserTokens>(entity =>
            {
                entity.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });

                entity.HasOne(d => d.User)
                    .WithMany(p => p.AspNetUserTokens)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<AspNetUsers>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasMaxLength(256);

                entity.Property(e => e.FirstName)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.NormalizedEmail).HasMaxLength(256);

                entity.Property(e => e.NormalizedUserName).HasMaxLength(256);

                entity.Property(e => e.UserName)
                    .HasMaxLength(256)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblAdmin>(entity =>
            {
                entity.HasKey(e => e.AdminId);

                entity.Property(e => e.AdminId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IndexNumber).ValueGeneratedOnAdd();

                entity.Property(e => e.LastModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
            });

            modelBuilder.Entity<TblCountry>(entity =>
            {
                entity.HasKey(e => e.CountryId)
                    .HasName("PK_tbl_Country");

                entity.HasIndex(e => e.Flag)
                    .HasName("IX_tbl_Country")
                    .IsUnique();

                entity.Property(e => e.CountryId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.CountryName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Flag)
                    .IsRequired()
                    .HasMaxLength(16)
                    .IsUnicode(false);

                entity.Property(e => e.IndexNumber).ValueGeneratedOnAdd();

                entity.Property(e => e.LastModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.TblCountryCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_TblCountry_TblUser");

                entity.HasOne(d => d.LastModifedByNavigation)
                    .WithMany(p => p.TblCountryLastModifedByNavigation)
                    .HasForeignKey(d => d.LastModifedBy)
                    .HasConstraintName("FK_TblCountry_TblUser1");
            });

            modelBuilder.Entity<TblRole>(entity =>
            {
                entity.HasKey(e => e.RoleId)
                    .HasName("PK_tbl_Roles");

                entity.Property(e => e.RoleId).HasColumnName("RoleID");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(64)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblUser>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PK_tbl_User");

                entity.Property(e => e.UserId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.DateCreated)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TblUserDetails>(entity =>
            {
                entity.HasKey(e => e.UserDetailsId)
                    .HasName("PK_tbl_VesselSpecification");

                entity.Property(e => e.UserDetailsId).HasDefaultValueSql("(newid())");

                entity.Property(e => e.AddressLine1)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LastModifiedDate)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PicturePathOrUrl)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.StateName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.HasOne(d => d.CreatedByNavigation)
                    .WithMany(p => p.TblUserDetailsCreatedByNavigation)
                    .HasForeignKey(d => d.CreatedBy)
                    .HasConstraintName("FK_TblvesselSpecification_TblUser");

                entity.HasOne(d => d.LastmodifiedByNavigation)
                    .WithMany(p => p.TblUserDetailsLastmodifiedByNavigation)
                    .HasForeignKey(d => d.LastmodifiedBy)
                    .HasConstraintName("FK_TblvesselSpecification_TblUser1");
            });

            modelBuilder.Entity<ViewCustomers>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("View_Customers");

                entity.Property(e => e.AddressLine1)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.DateCreated).HasColumnType("datetime");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasMaxLength(64);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);

                entity.Property(e => e.PicturePathOrUrl)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.StateName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(32)
                    .IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
