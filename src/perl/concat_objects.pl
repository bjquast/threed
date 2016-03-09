#!/usr/bin/perl

use strict;
use warnings;
use Getopt::Std;




# Kommandozeilenparameter übernehmen
my %options;
getopts ('i:o:', \%options);



my $objfilesdir;
if ($options{i}) {
    $objfilesdir = $options{i};
    chomp ($objfilesdir);
}
else {
    print "\nbitte Verzeichnis mit obj-Dateien angeben\n: ";
    $objfilesdir = <STDIN>;
    chomp ($objfilesdir);
}


my $outfile;
if ($options{o}) {
    $outfile = $options{o};
    chomp ($outfile);
}
else {
    print "\nbitte Datei zum Speichern angeben\n: ";
    $outfile = <STDIN>;
    chomp ($outfile);
}




my @infilearray;


if (-d $objfilesdir) {
    opendir(DIR, $objfilesdir);
    my @zwischenliste = sort (readdir (DIR));

    # nur Dateien
    @zwischenliste = grep (-f "$objfilesdir/$_", @zwischenliste);
    # nur obj-Dateien in der liste behalten
    @zwischenliste = grep (/obj+$/i, @zwischenliste);

    foreach my $element (@zwischenliste) {
	push (@infilearray, "$element");
    }


}


my $objvertnumber = 0;
my $vertcount = 0;
my @faces;


my @alllines;

foreach my $element (@infilearray) {
    
#    my $filename = $element =~ m/\/.*?/i;
    my $filepath = "$objfilesdir\/$element";
    
    my ($objectname) = $element =~ m/(.*)\.\w+/;
    
#    push (@alllines, "\n# $element");
    push (@alllines, "\ng $objectname\n");
    


    print "\n$filepath";

    open (INDAT, "<$filepath") or die ("\nkann Datei $filepath nicht oeffnen\n");


    print "\n";
 
    my $line;
    while ($line = <INDAT>) {
#	$line =~ s/\r\n$//;

	if ($line =~ m/v\s+\.*/) {
	    $vertcount++;
	}

	if (($line =~ m/^\s*f\ .*/) && ($objvertnumber != 0)) {

	    @faces = $line =~ m/(\s+\d+)/g;
	    my @newfaces;
	    foreach my $vert (@faces) {
#		print "vert $vert\n";
		$vert =~ s/\s+//g;
#		print "vert $vert\n";

		$vert = $vert + $objvertnumber;
		push (@newfaces, $vert);
	    } 

	    my $faceverts = join(" ", @newfaces);

	    $line = "f ".$faceverts."\n"; 

	    print $line;
	}


       	push (@alllines, "$line");
    }

    $objvertnumber = $vertcount;    
    close INDAT;
}

open (OUTDAT, ">$outfile") or die ("\nkann Datei $outfile nicht oeffnen\n");


my $head = "# OBJ File\n";
print OUTDAT $head;


foreach my $line (@alllines) {
    print OUTDAT $line
}

print OUTDAT "\n";

close OUTDAT;

