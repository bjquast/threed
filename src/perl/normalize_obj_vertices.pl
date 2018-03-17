#!/usr/bin/perl

use strict;
use warnings;
use Getopt::Std;




# Kommandozeilenparameter übernehmen
my %options;
getopts ('i:f:x:y:z:', \%options);



my $objfile;
if ($options{i}) {
    $objfile = $options{i};
    chomp ($objfile);
}
else {
    print "\nbitte vollstaendigen Pfad mit Dateinamen angeben \n: ";
    $objfile = <STDIN>;
    chomp ($objfile);
}

my $scalefactor;
if ($options{f}) {
    $scalefactor = $options{f};
    chomp ($scalefactor);
}

my $xtrans;
if ($options{x}) {
    $xtrans = $options{x};
    chomp ($xtrans);
}

my $ytrans;
if ($options{y}) {
    $ytrans = $options{y};
    chomp ($ytrans);
}

my $ztrans;
if ($options{z}) {
    $ztrans = $options{z};
    chomp ($ztrans);
}



my @outarray;
my $filename; 
my $line;
my $min;
my $max;
#my $first;
my $factor;
my $xavg;
my $yavg;
my $zavg;

open (INDAT, "<$objfile") or die ("\nkann Datei $objfile nicht oeffnen\n");


my @vertices;
#    my @allvertices;
my @xvertices;
my @yvertices;
my @zvertices;
my @alllines;



while ($line = <INDAT>) {

    push (@alllines, $line);

    if (@vertices = $line =~ m/v\s+(-*\d+\.*\d*)\s+(-*\d+\.*\d*)\s+(-*\d+\.*\d*)/i) {
	foreach my $element (@vertices) {
	    push (@xvertices, $vertices[0]);
	    push (@yvertices, $vertices[1]);
	    push (@zvertices, $vertices[2]);
	    

	    
	    
=command
		unless ($first) {
		    $min = $element;
		    $max = $element;
		    $first = 1;
		}
		if ($element < $min) {
		    $min = $element;
		}
		if ($element > $max) {
		    $max = $element;
		}
=cut

	}
    }
}

$min = $xvertices[0];
$max = $xvertices[0];

my $xsum;
foreach my $element (@xvertices) {
    if ($element < $min) {
	$min = $element;
    }
    if ($element > $max) {
	$max = $element;
    }
    $xsum += $element;
} 
$xavg = $xsum / ($#xvertices + 1);


my $ysum;
foreach my $element (@yvertices) {
    if ($element < $min) {
	$min = $element;
    }
    if ($element > $max) {
	$max = $element;
    }
	$ysum += $element;
} 
$yavg = $ysum / ($#yvertices + 1);


my $zsum;
foreach my $element (@zvertices) {
    if ($element < $min) {
	$min = $element;
    }
    if ($element > $max) {
	    $max = $element;
    }
    $zsum += $element;
} 
$zavg = $zsum / ($#zvertices + 1);

 


if (($max - $min) != 0) {
    $factor = (1/($max - $min));
    my $decimals = 1;
    my $result = 0;
    
    
    while ($result == 0) {
	$decimals *= 10;
	$result = (int ($factor * $decimals + 0.5));
    } 
    
    $factor = (int($factor * $decimals * 10 + 0.5)) / ($decimals * 10);  
}
else {
    $factor = 1;
}



# overwrite calculated values if given in parameters
if ($scalefactor) {
    $factor = $scalefactor;
}

if ($xtrans) {
    $xavg = $xtrans;
}
$xavg *= $factor;


if ($ytrans) {
    $yavg = $ytrans;
}
$yavg *= $factor;


if ($ztrans) {
    $zavg = $ztrans;
}
$zavg *= $factor;



if ($xavg >= 1) {
    $xavg = (int($xavg * 100 + 0.5)) / 100; 
}
else {
    $xavg = 0;	
}

if ($yavg >= 1) {
    $yavg = (int($yavg * 100 + 0.5)) / 100; 
}
else {
    $yavg = 0;	
}

if ($zavg >= 1) {
    $zavg = (int($zavg * 100 + 0.5)) / 100; 
}
else {
    $zavg = 0;	
}





	

print "$min, $max, $factor, $xavg, $yavg, $zavg\n";


foreach my $line (@alllines) {


    if (@vertices = $line =~ m/v\s+(-*\d+\.*\d*)\s+(-*\d+\.*\d*)\s+(-*\d+\.*\d*)/i) {
	my $newx = sprintf("%.5f", ($vertices[0] * $factor - $xavg));
	my $newy = sprintf("%.5f", ($vertices[1] * $factor - $yavg));
	my $newz = sprintf("%.5f", ($vertices[2] * $factor - $zavg));

#	print "old: $line\n";
	$line =~ s/(\s*v\s+)-*\d+\.*\d*(\s+)-*\d+\.*\d*(\s+)-*\d+\.*\d*/$1$newx$2$newy$3$newz/i;
#	print "new: $line\n";

	push (@outarray, $line);

    }

    else {
	push (@outarray, $line);
    }

}



my $objfile_copy = $objfile."_${factor}_scaled_${xavg}_xtrans_${yavg}_ytrans_${zavg}_ztrans.obj";

close INDAT;

open (OUTDAT, ">$objfile_copy") or die ("\nkann Datei $objfile_copy nicht oeffnen\n");

foreach $line (@outarray) {
    print OUTDAT $line
}
close OUTDAT;